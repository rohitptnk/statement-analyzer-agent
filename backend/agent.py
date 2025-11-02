from langchain_community.document_loaders import PyPDFLoader
import pandas as pd
import re
import numpy as np
from langchain.tools import tool
from langchain.agents import create_agent
import os
from dotenv import load_dotenv
import json

load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')

# ---------- PARSER TOOLS ----------
@tool
def parse_pdf(file_path: str) -> str:
    """Load PDF and return raw text."""
    loader = PyPDFLoader(file_path)
    docs = loader.load()
    full_text = "\n".join([doc.page_content for doc in docs])
    return full_text

@tool
def parse_excel(files_path: str) -> str:
    """Load Excel and return JSON-string of rows."""
    df = pd.read_csv("statements\oct2025_csv.csv", header=None)
    info_df = df.iloc[:20]
    info_df = info_df.drop(columns=[2,3,4,5,6])
    info_text = info_df.to_string(index=False, header=False)

    # Clean the text:
    info_text = "\n".join(
        re.sub(r'\s+', ' ', line.strip())   
        for line in info_text.splitlines()
        if line.strip()                    
    )

    transaction_df = df.iloc[21:].copy() # data starts from row 21 downward
    headers = [str(col).strip() for col in df.iloc[20].tolist()]
    transaction_df.columns = headers

    transaction_df = transaction_df.drop(columns=["Value Date"])

    # Replace empty strings or whitespace-only cells with NaN
    transaction_df['Credit'] = transaction_df['Credit'].replace(r'^\s*$', np.nan, regex=True)
    transaction_df['Debit'] = transaction_df['Debit'].replace(r'^\s*$', np.nan, regex=True)

    transaction_df = transaction_df.rename(columns={"Txn Date": "Date", "Ref No./Cheque No.": "Reference Number"})

    transaction_df["Type"] = np.where(
        transaction_df['Credit'].notna(), 'Income',
        np.where(transaction_df['Debit'].notna(), 'Expense', 'Unknown')
    )

    trans_json = transaction_df.to_json(orient="records")

    return info_text, trans_json

# ---------- AGENT ----------
def analysis_agent(file_path: str):
    categorize_schema = {
        "type": "object",
        "description": "Structured output containing categorized bank transactions.",
        "properties": {
            "overview": {"type": "string", "description": (
                "Extract and summarize the basic details of the statement file, including the account holder's name, account number, address, "
                "opening and closing balances, and any other identifiable information. Additionally, provide a concise yet insightful overview "
                "of the account - such as the general spending and income patterns, major expense categories, frequency of transactions, and any "
                "notable financial behaviors or trends that can be inferred from the statement."
            )},
            "transactions": {
                "type": "array",
                "description": "List of categorized transactions.",
                "items": {
                    "type": "object",
                    "properties": {
                        "date": {"type": "string", "description": "Transaction date."},
                        "description": {"type": "string", "description": "Narration or details."},
                        "amount": {"type": "number", "description": "Positive for income, negative for expense."},
                        "type": {
                            "type": "string",
                            "enum": ["income", "expense"],
                            "description": "Transaction type."
                        },
                        "category": {
                            "type": "string",
                            "description": (
                                "For income: one of ['salary', 'investment redemption', 'dividend', 'interest', 'other']; "
                                "for expense: one of ['groceries', 'rent', 'food', 'EMI', 'investment', 'utilities', 'travel', "
                                "'entertainment', 'medical', 'other']."
                            )
                        }
                    },
                    "required": ["date", "description", "amount", "type", "category"]
                }
            },
            "insights": {"type": "string", "description": (
                "Insights on spending patterns, savings rate, unusual transactions, and "
                "personalized financial recommendations for the account holder."
            )}
        },
        "required": ["overview", "transactions", "insights"]
    }



    agent = create_agent(
        model="openai:gpt-5-nano",
        tools=[parse_excel, parse_pdf],
        system_prompt=(
            "You are a financial data assistant. You will be given either an Excel or PDF file path. Use the correct tool "
            "(parse_excel or parse_pdf) to extract transaction details. From the extracted data, identify all the transactions "
            "and output them in the specified response schema. Each transaction must include date, description, amount, type "
            "(“income” or “expense”), and a clear category. Use appropriate categories (salary, rent, groceries, utilities, etc.) "
            "and avoid using “other” unless absolutely necessary. Do not leave any transaction uncategorized or missing."
        ),
        response_format=categorize_schema 
    )

    result = agent.invoke({
        "messages": [{"role": "user", "content": file_path}]
    })

    return result["structured_response"]

if __name__ == "__main__":
    print("running directly")
    result = analysis_agent("statements\Mock_Bank_Statement.pdf")
    with open("output.txt", "w", encoding="utf-8") as f:
        json.dump(result, f, indent=4)

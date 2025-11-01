
def mock_agent(file_path: str):
    return(
        {
            "overview": "Account: Rahul Verma | Account No: 0000005023841123 | Branch: KORMANGALA, BANGALORE | Description: Savings Account | Statement period: 01-Apr-2024 to 31-Aug-2024 | Opening balance: not provided in the statement | Closing balance (as of 25-Aug-2024): \u20b9326,800",
            "transactions": [
                {
                    "date": "2024-04-01",
                    "description": "Salary Credit \u2013 INFOSYS LTD",
                    "amount": 120000,
                    "type": "income",
                    "category": "salary"
                },
                {
                    "date": "2024-04-03",
                    "description": "Amazon Purchase \u2013 Groceries",
                    "amount": -3200,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-04-05",
                    "description": "EMI Payment \u2013 HDFC BANK Loan No. 8734",
                    "amount": -12500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-04-07",
                    "description": "ZOMATO \u2013 Food Order",
                    "amount": -2400,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-04-10",
                    "description": "Swiggy \u2013 Food Delivery",
                    "amount": -1500,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-04-12",
                    "description": "Interest on FD \u2013 SBI",
                    "amount": 2000,
                    "type": "income",
                    "category": "interest"
                },
                {
                    "date": "2024-04-15",
                    "description": "IRCTC \u2013 Train Ticket (Delhi Trip)",
                    "amount": -4800,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-04-18",
                    "description": "Fuel Payment \u2013 HP Petrol Pump",
                    "amount": -5000,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-04-20",
                    "description": "Rent Transfer \u2013 To ANKIT SHARMA",
                    "amount": -15000,
                    "type": "expense",
                    "category": "rent"
                },
                {
                    "date": "2024-04-23",
                    "description": "Netflix Annual Subscription",
                    "amount": -3000,
                    "type": "expense",
                    "category": "entertainment"
                },
                {
                    "date": "2024-05-01",
                    "description": "Salary Credit \u2013 INFOSYS LTD",
                    "amount": 120000,
                    "type": "income",
                    "category": "salary"
                },
                {
                    "date": "2024-05-03",
                    "description": "EMI Payment \u2013 HDFC BANK Loan No. 8734",
                    "amount": -12500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-05-05",
                    "description": "SPAR \u2013 Groceries",
                    "amount": -2700,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-05-07",
                    "description": "Swiggy \u2013 Food Order",
                    "amount": -1200,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-05-09",
                    "description": "Uber \u2013 Local Travel",
                    "amount": -3000,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-05-12",
                    "description": "Indigo Airlines \u2013 Flight to Delhi",
                    "amount": -9800,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-05-15",
                    "description": "Rent Transfer \u2013 To ANKIT SHARMA",
                    "amount": -15000,
                    "type": "expense",
                    "category": "rent"
                },
                {
                    "date": "2024-05-18",
                    "description": "BigBasket \u2013 Groceries",
                    "amount": -2500,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-05-21",
                    "description": "Refund \u2013 Indigo Airlines",
                    "amount": 3000,
                    "type": "income",
                    "category": "other"
                },
                {
                    "date": "2024-05-25",
                    "description": "Caf\u00e9 Coffee Day \u2013 Entertainment",
                    "amount": -4200,
                    "type": "expense",
                    "category": "entertainment"
                },
                {
                    "date": "2024-05-28",
                    "description": "Shopping \u2013 Lifestyle Mall",
                    "amount": -7000,
                    "type": "expense",
                    "category": "entertainment"
                },
                {
                    "date": "2024-06-01",
                    "description": "Salary Credit \u2013 INFOSYS LTD",
                    "amount": 120000,
                    "type": "income",
                    "category": "salary"
                },
                {
                    "date": "2024-06-03",
                    "description": "EMI Payment \u2013 HDFC BANK Loan No. 8734",
                    "amount": -12500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-06-05",
                    "description": "Amazon Fresh \u2013 Groceries",
                    "amount": -1900,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-06-07",
                    "description": "BigBasket \u2013 Groceries",
                    "amount": -15000,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-06-09",
                    "description": "Rent Transfer \u2013 To ANKIT SHARMA",
                    "amount": -5000,
                    "type": "expense",
                    "category": "rent"
                },
                {
                    "date": "2024-06-12",
                    "description": "Goibibo \u2013 Hotel Booking",
                    "amount": -2800,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-06-14",
                    "description": "Swiggy \u2013 Lunch Order",
                    "amount": -3200,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-06-18",
                    "description": "Medical Store \u2013 Apollo Pharmacy",
                    "amount": -2000,
                    "type": "expense",
                    "category": "medical"
                },
                {
                    "date": "2024-06-22",
                    "description": "Auto Debit \u2013 Mobile Bill (Airtel)",
                    "amount": -6500,
                    "type": "expense",
                    "category": "utilities"
                },
                {
                    "date": "2024-06-25",
                    "description": "Movie + Dinner \u2013 Entertainment",
                    "amount": -7000,
                    "type": "expense",
                    "category": "entertainment"
                },
                {
                    "date": "2024-06-27",
                    "description": "EMI Payment \u2013 SBI Credit Card",
                    "amount": -4500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-07-01",
                    "description": "Amazon Purchase \u2013 Electronics",
                    "amount": -120000,
                    "type": "expense",
                    "category": "other"
                },
                {
                    "date": "2024-07-03",
                    "description": "Salary Credit \u2013 INFOSYS LTD",
                    "amount": 12000,
                    "type": "income",
                    "category": "salary"
                },
                {
                    "date": "2024-07-05",
                    "description": "EMI Payment \u2013 HDFC BANK Loan No. 8734",
                    "amount": -12500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-07-06",
                    "description": "Domino\u2019s \u2013 Food Order",
                    "amount": -1500,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-07-07",
                    "description": "BigBasket \u2013 Groceries",
                    "amount": -15000,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-07-08",
                    "description": "Travel \u2013 Ola Outstation",
                    "amount": -2300,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-07-12",
                    "description": "Rent Transfer \u2013 To ANKIT SHARMA",
                    "amount": -15000,
                    "type": "expense",
                    "category": "rent"
                },
                {
                    "date": "2024-07-15",
                    "description": "Swiggy \u2013 Dinner",
                    "amount": -2200,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-07-18",
                    "description": "EMI Payment \u2013 HDFC BANK (Late Fee Applied)",
                    "amount": -6200,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-07-19",
                    "description": "EMI Late Payment Penalty \u2013 HDFC BANK",
                    "amount": -500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-07-22",
                    "description": "Medical Insurance Premium \u2013 LIC",
                    "amount": -8000,
                    "type": "expense",
                    "category": "medical"
                },
                {
                    "date": "2024-07-25",
                    "description": "Restaurant \u2013 Friends Dinner",
                    "amount": -4500,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-07-27",
                    "description": "EMI Payment \u2013 SBI Credit Card",
                    "amount": -7000,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-07-29",
                    "description": "Caf\u00e9 Coffee Day \u2013 Snacks",
                    "amount": -3000,
                    "type": "expense",
                    "category": "food"
                },
                {
                    "date": "2024-08-01",
                    "description": "Salary Credit \u2013 INFOSYS LTD",
                    "amount": 120000,
                    "type": "income",
                    "category": "salary"
                },
                {
                    "date": "2024-08-03",
                    "description": "EMI Payment \u2013 HDFC BANK Loan No. 8734",
                    "amount": -12500,
                    "type": "expense",
                    "category": "EMI"
                },
                {
                    "date": "2024-08-05",
                    "description": "Grofers \u2013 Groceries",
                    "amount": -3500,
                    "type": "expense",
                    "category": "groceries"
                },
                {
                    "date": "2024-08-10",
                    "description": "Travel \u2013 Indigo Flight",
                    "amount": -5000,
                    "type": "expense",
                    "category": "travel"
                },
                {
                    "date": "2024-08-12",
                    "description": "Entertainment \u2013 PVR Movies",
                    "amount": -4000,
                    "type": "expense",
                    "category": "entertainment"
                },
                {
                    "date": "2024-08-15",
                    "description": "Rent Transfer \u2013 To ANKIT SHARMA",
                    "amount": -15000,
                    "type": "expense",
                    "category": "rent"
                },
                {
                    "date": "2024-08-20",
                    "description": "Swiggy \u2013 Dinner Party",
                    "amount": -6200,
                    "type": "expense",
                    "category": "entertainment"
                },
                {
                    "date": "2024-08-25",
                    "description": "Mobile Recharge \u2013 Airtel",
                    "amount": -2400,
                    "type": "expense",
                    "category": "utilities"
                }
            ],
            "insights": "Key patterns observed: (1) Regular salary credits around \u20b9120,000 at the start of each month (with an additional \u20b912,500 salary entry on 03-Jul in this dataset). (2) Fixed recurring obligations include EMI payments (approx. \u20b912,500 per month) and Rent transfers \u20b915,000 around mid-month, indicating a predictable fixed cost structure. (3) Groceries and dining out constitute a sizable portion of discretionary spending, with frequent entries for groceries (BigBasket, Grofers) and multiple food delivery orders (Zomato, Swiggy, Domino\u2019s, Caf\u00e9 Coffee Day). (4) Travel-related spend is noticeable but episodic (Indigo flight bookings, Ola travel, Goibibo hotel). (5) Subscriptions and insurance (Netflix, LIC medical insurance) contribute to regular monthly expenses. (6) There are occasional refunds and penalties (Indigo refund \u20b93,000; EMI late fee penalties \u20b96,200 and \u20b9500). (7) Ending balance by 25-Aug-2024 is \u20b9326,800, suggesting a healthy savings trajectory given the consistent salary inflows and controlled EMI/rent outflows. Recommendations: - Create a monthly budget by category to further optimize dining/delivery and entertainment spend. - Review large electronics purchase at 01-Jul-2024 (\u20b9120,000) to confirm necessity and explore alternatives or financing options. - Consider consolidating or negotiating EMI terms if possible to reduce late-fee penalties. - Maintain auto-payment for rent and EMI to avoid penalties; review mobile/telecom recurring charges (Airtel) for potential savings. - If possible, set a target savings rate (e.g., 40-50%) to capitalize on high salary inflows while maintaining liquidity."
        }
    )
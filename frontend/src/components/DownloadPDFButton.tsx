import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function DownloadPdfButton() {
    const handleDownload = async() => {
        const dashboard = document.getElementById("dashboard-content");
        if (!dashboard) {
            alert("Dashboard not found")
            return;
        }

        // We'll capture each top-level child of the dashboard separately so
        // charts or other components won't be split across pages.
        const children = Array.from(dashboard.children) as HTMLElement[];

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 12; // mm
        const availWidth = pdfWidth - margin * 2;
        const availHeight = pdfHeight - margin * 2;

        // Pre-capture canvases for all children so we can make layout decisions
        const captured: Array<{
            el: HTMLElement;
            canvas: HTMLCanvasElement;
            imgData: string;
            imgHeight: number;
            imgWidth: number;
        }> = [];

        for (const child of children) {
            const rect = child.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const childCanvas = await html2canvas(child, {
                scale: 2,
                useCORS: true,
                scrollX: 0,
                scrollY: -window.scrollY,
            });

            const imgWidth = availWidth;
            const imgHeight = (childCanvas.height * imgWidth) / childCanvas.width;
            captured.push({ el: child, canvas: childCanvas, imgData: childCanvas.toDataURL("image/png"), imgHeight, imgWidth });
        }

        // helper to detect header elements (avoid orphaning headers)
        const isHeader = (el: HTMLElement) => {
            const tag = el.tagName.toLowerCase();
            if (tag.startsWith("h")) return true;
            // Tailwind-ish heuristics: headings often use these classes
            const cls = el.className || "";
            if (cls.includes("text-lg") || cls.includes("font-semibold") || cls.includes("text-xl")) return true;
            return false;
        };

        let isFirstPage = true;
        let remainingSpace = availHeight; // remaining vertical space on current page

        for (let i = 0; i < captured.length; i++) {
            const item = captured[i];
            const next = captured[i + 1];

            // If item fits in remaining space, but is a header and next item does not fit,
            // start a new page so header and next content are kept together.
            if (item.imgHeight <= remainingSpace) {
                if (isHeader(item.el) && next && next.imgHeight > remainingSpace) {
                    // start new page before this header
                    if (!isFirstPage) pdf.addPage();
                    pdf.addImage(item.imgData, "PNG", margin, margin, item.imgWidth, item.imgHeight);
                    remainingSpace = availHeight - item.imgHeight;
                } else {
                    // place on current page
                    if (isFirstPage) {
                        // already on first page
                        pdf.addImage(item.imgData, "PNG", margin, margin + (availHeight - remainingSpace), item.imgWidth, item.imgHeight);
                    } else {
                        pdf.addImage(item.imgData, "PNG", margin, margin + (availHeight - remainingSpace), item.imgWidth, item.imgHeight);
                    }
                    remainingSpace -= item.imgHeight;
                }
            } else if (item.imgHeight <= availHeight) {
                // doesn't fit current page but fits a fresh page: start new page
                if (!isFirstPage) pdf.addPage();
                pdf.addImage(item.imgData, "PNG", margin, margin, item.imgWidth, item.imgHeight);
                remainingSpace = availHeight - item.imgHeight;
            } else {
                // item taller than a page — slice it across pages
                // if not first page, start fresh for the slicing to keep slices aligned
                if (!isFirstPage) pdf.addPage();

                let heightLeft = item.imgHeight;
                let position = 0;

                pdf.addImage(item.imgData, "PNG", margin, margin, item.imgWidth, item.imgHeight);
                heightLeft -= availHeight;

                while (heightLeft > 0) {
                    position -= availHeight;
                    pdf.addPage();
                    pdf.addImage(item.imgData, "PNG", margin, position + margin, item.imgWidth, item.imgHeight);
                    heightLeft -= availHeight;
                }

                remainingSpace = availHeight - Math.max(0, item.imgHeight % availHeight);
                if (remainingSpace === availHeight) remainingSpace = 0; // exact fit
            }

            isFirstPage = false;
            // If remainingSpace is very small, start a new page for next item
            if (remainingSpace < 6) {
                remainingSpace = availHeight;
                pdf.addPage();
                isFirstPage = false;
            }
        }

        pdf.save("Report.pdf");
    };

    return (
        <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
            Download PDF
        </button>
    );
}
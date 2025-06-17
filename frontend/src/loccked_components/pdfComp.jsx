import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
 

function PdfComp({ pdfUrl }) {
  const docs = [
    {
      uri: pdfUrl,
      fileType: "pdf",
    },
  ];

  return (
    <div className="flex text-2xl text-black w-full h-screen mt-0 mr-0 pt-8 bg-zinc-50 overflow-auto pdf-wrapper">
      <DocViewer
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        theme={{
          primary: "#1e3a8a", // dark blue
          secondary: "#f3f4f6", // gray
          tertiary: "#111827", // dark gray
          textPrimary: "#ffffff",
          textSecondary: "#e5e7eb",
        }}
      />
    </div>
  );
}

export default PdfComp;

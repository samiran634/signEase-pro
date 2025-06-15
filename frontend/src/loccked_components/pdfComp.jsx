 
 
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
 
 
function PdfComp({ pdfUrl }) {
 
 const docs=[{
  uri:pdfUrl,
  fileType:"pdf",
 }]
  return (
    <>                                     
    <div className="flex w-full h-screen mt-0 mr-0 pt-8 bg-zinc-50 overflow-auto">
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}
        style={{height:1000,color:"black"}}
        />
    </div>

    </>
  );
}

export default PdfComp;

 
 
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
 
 
function PdfComp({ pdfUrl }) {
 console.log(pdfUrl)
 const docs=[{
  uri:pdfUrl,
  fileType:"pdf",
 }]
  return (
    <>                                     
    <div className="flex text-2xl text-black w-full h-screen mt-0 mr-0 pt-8 bg-zinc-50 overflow-auto">
      <DocViewer documents={docs} pluginRenderers={DocViewerRenderers}
        
        />
    </div>

    </>
  );
}

export default PdfComp;

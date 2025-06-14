import { useState } from 'react'
import { PinataSDK } from 'pinata'
import { useOrganization } from '@clerk/clerk-react'
const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
})

function FileUpload(orgId) {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [link, setLink] = useState('')
 async function getFileHash(file) {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
const orgCode=useOrganization().organization.id;

  const handleFileChange = ( e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      console.log(file);
    }
  }
//send request to backed to upload file to specific group id
  const handleUpload = async () => {
    if (!file) return
    const hash=getFileHash(file);
    console.log(hash);
    try {
      setUploadStatus('Getting upload URL...')
      const urlResponse = await fetch(`${import.meta.env.VITE_SERVER_URL}upload_file?orgCode=${orgId}`, {
        method: "POST",
        headers: {
          // Handle your own server authorization here
        }
      })
      const data = await urlResponse.json()

      setUploadStatus('Uploading file...')

      const upload = await pinata.upload.public
        .file(file)
        .url(data.url)

      if (upload.cid) {
        setUploadStatus('File uploaded successfully!')
        const ipfsLink = await pinata.gateways.public.convert(upload.cid)
        setLink(ipfsLink)
      } else {
        setUploadStatus('Upload failed')
      }
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <>
     
     
      <div className="card">
        <label className='block'> 
             <span className="block text-gray-700 font-medium mb-2">Upload PDF</span>
             <input type="file" onChange={handleFileChange} className='block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                     cursor-pointer transition' />
        </label>
        <button onClick={handleUpload} disabled={!file} className='cursor-pointer hover:transition-colors  bg-blue-200 p-2 border-amber-100 rounded-3xl '>
          Upload to IFPS
        </button>
        {uploadStatus && <p>{uploadStatus}</p>}
        {link && <a href={link} target='_blank' className=' bg-blue-200 p-2 border-amber-100 rounded-3xl '>View File</a>}
      </div>
   
    </>
  )
}

export default FileUpload
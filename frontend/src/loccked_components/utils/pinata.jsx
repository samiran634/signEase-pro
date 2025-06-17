import { useState } from 'react'
 
 import { PinataSDK } from 'pinata'

const pinata = new PinataSDK({
  pinataJwt: import.meta.env.VITE_JWT,
  pinataGateway: import.meta.env.VITE_GATEWAY_URL
})

 

function FileUpload({ orgId }) {
  const [file, setFile] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [link, setLink] = useState('')

   console.log(orgId)

  async function getFileHash(file) {
    const buffer = await file.arrayBuffer()
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !orgId) {
      setUploadStatus("Missing file or orgId")
      return
    }

    const hash = await getFileHash(file)
    console.log("File hash:", hash)

    try {
      setUploadStatus('Uploading file...')

      const formData = new FormData()
      formData.append('file', file)

      const url = `${import.meta.env.VITE_SERVER_URL}upload_file?orgId=${orgId}`

      const response = await fetch(url, {
        method: "POST",
        body: formData
      })

      const result = await response.json()

      if (result.cid) {
        setUploadStatus('File uploaded successfully!')
        const gateway = import.meta.env.VITE_GATEWAY_URL || "https://gateway.pinata.cloud/ipfs"
      const ipfsLink = await pinata.gateways.public.convert(result.cid)
        setLink(ipfsLink)
      } else {
        setUploadStatus(result.error || 'Upload failed')
      }
    } catch (error) {
      setUploadStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="card">
      <label className='block'>
        <span className="block text-gray-700 font-medium mb-2">Upload PDF</span>
        <input
          type="file"
          onChange={handleFileChange}
          className='block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                     file:rounded-full file:border-0 file:text-sm file:font-semibold 
                     file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 
                     cursor-pointer transition'
        />
      </label>
      <button
        onClick={handleUpload}
        disabled={!file}
        className='cursor-pointer hover:transition-colors bg-blue-200 p-2 border-amber-100 rounded-3xl mt-2'
      >
        Upload to IPFS
      </button>
      {uploadStatus && <p className="mt-2 text-sm">{uploadStatus}</p>}
      {link && (
        <a
          href={link}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block mt-2 bg-blue-200 p-2 border-amber-100 rounded-3xl'
        >
          View File
        </a>
      )}
    </div>
  )
}

 


export default FileUpload
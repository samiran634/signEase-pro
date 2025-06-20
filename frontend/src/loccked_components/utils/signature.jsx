import React, { useState, useRef, useEffect } from 'react';
import { X, Pen, Type, Upload, Check, RotateCcw } from 'lucide-react';

const SignaturePDF = ({ onClose, onConfirm }) => {
  const [signatureType, setSignatureType] = useState('draw'); // 'draw', 'type', 'upload'
  const [typedSignature, setTypedSignature] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [signatureData, setSignatureData] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#1f2937';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  }, []);

  const startDrawing = (e) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    setSignatureData(canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureData(null);
  };

  const handleConfirm = () => {
    let signature = null;
    
    if (signatureType === 'draw' && signatureData) {
      signature = signatureData;
    } else if (signatureType === 'type' && typedSignature.trim()) {
      signature = typedSignature.trim();
    }
    
    if (signature) {
      onConfirm && onConfirm({ type: signatureType, data: signature });
      onClose && onClose();
    }
  };

  const isSignatureReady = () => {
    return (signatureType === 'draw' && signatureData) || 
           (signatureType === 'type' && typedSignature.trim()) ||
           (signatureType === 'upload');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sign Document</h2>
            <p className="text-sm text-gray-600 mt-1">Please provide your digital signature to confirm the deal</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-80 rounded-full transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Signature Type Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Choose signature method:
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSignatureType('draw')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  signatureType === 'draw'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Pen className="w-4 h-4" />
                Draw
              </button>
              <button
                onClick={() => setSignatureType('type')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  signatureType === 'type'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Type className="w-4 h-4" />
                Type
              </button>
              <button
                onClick={() => setSignatureType('upload')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                  signatureType === 'upload'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Upload className="w-4 h-4" />
                Upload
              </button>
            </div>
          </div>

          {/* Signature Input Area */}
          <div className="mb-6">
            {signatureType === 'draw' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={200}
                    className="w-full h-48 bg-gray-500 rounded border cursor-crosshair"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-sm text-gray-600">Draw your signature above</p>
                    <button
                      onClick={clearCanvas}
                      className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors duration-200"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}

            {signatureType === 'type' && (
              <div className="space-y-4">
                <input
                  type="text"
                  value={typedSignature}
                  onChange={(e) => setTypedSignature(e.target.value)}
                  placeholder="Type your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {typedSignature && (
                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="text-2xl font-script text-blue-700 italic">
                      {typedSignature}
                    </div>
                  </div>
                )}
              </div>
            )}

            {signatureType === 'upload' && (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center bg-gray-50">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Upload your signature image</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 2MB</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="signature-upload"
                />
                <label
                  htmlFor="signature-upload"
                  className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  Choose File
                </label>
              </div>
            )}
          </div>

          {/* Legal Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs font-bold text-yellow-800">!</span>
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Legal Agreement</p>
                <p className="text-xs text-yellow-700 mt-1">
                  By signing this document, you agree to be legally bound by its terms and conditions. 
                  Your digital signature has the same legal effect as a handwritten signature.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isSignatureReady()}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                isSignatureReady()
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Check className="w-4 h-4" />
              Confirm Signature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignaturePDF;
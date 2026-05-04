"use client";
import { useEffect, useState, useRef } from "react";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";

export default function AbstractPage() {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (!u) {
      window.location.href = "/login";
      return;
    }
    const parsed = JSON.parse(u);
    setUser(parsed);
    fetchDocuments(parsed.id);
  }, []);

  const fetchDocuments = async (guestId: string) => {
    try {
      const res = await fetch(`/api/documents?id=${guestId}`);
      const data = await res.json();
      setDocuments(data.documents || []);
    } catch {
      setDocuments([]);
    }
    setLoadingDocs(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setError("");
      setSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file || !user) return;
    setError("");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("guestId", user.id);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error || "Upload failed. Please try again.");
      } else {
        setSuccess(true);
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchDocuments(user.id);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setUploading(false);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return "📄";
    if (["ppt", "pptx"].includes(ext || "")) return "📊";
    if (["doc", "docx"].includes(ext || "")) return "📝";
    return "📁";
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit"
    });
  };

  if (!user) return null;

  return (
    <div className="app-bg">

      {/* HEADER */}
      <div className="page-header">
        <a href="/" className="page-header-back">
          <ArrowLeft size={20} />
        </a>
        <h2>Abstract Submission</h2>
      </div>

      <div className="abstract-container">

        {/* INFO BOX */}
        <div className="abstract-info-box">
          <strong>📋 Submission Guidelines</strong>
          Accepted formats: PDF, DOC, DOCX, PPT, PPTX<br/>
          Your abstract will be reviewed by the scientific committee.<br/>
          You can upload multiple files if needed.
        </div>

        {/* UPLOAD AREA */}
        <div
          className="upload-box"
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={handleFileChange}
          />
          <div className="upload-box-icon">📤</div>
          <div className="upload-box-text">
            {file ? "Change File" : "Tap to Select File"}
          </div>
          <div className="upload-box-sub">
            PDF, DOC, DOCX, PPT, PPTX supported
          </div>
        </div>

        {/* SELECTED FILE */}
        {file && (
          <div className="file-selected">
            <span style={{ fontSize: 22 }}>{getFileIcon(file.name)}</span>
            <span className="file-selected-name">{file.name}</span>
            <span style={{ fontSize: 12, color: "#888" }}>
              {(file.size / 1024 / 1024).toFixed(1)} MB
            </span>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <p style={{
            color: "#dc2626", fontSize: "13px",
            background: "#fef2f2", padding: "10px 14px",
            borderRadius: "10px", marginBottom: "12px"
          }}>
            ⚠️ {error}
          </p>
        )}

        {/* UPLOAD BUTTON */}
        {file && (
          <button
            className="upload-btn"
            onClick={handleUpload}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit Abstract"}
          </button>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="upload-success">
            <div className="upload-success-icon">✅</div>
            <h3>Abstract Submitted!</h3>
            <p>Your file has been sent to the scientific committee.</p>
          </div>
        )}

        {/* SUBMITTED DOCUMENTS */}
        <div className="documents-list">
          <h3>📁 Your Submissions</h3>

          {loadingDocs ? (
            <p style={{ fontSize: 13, color: "#888" }}>Loading...</p>
          ) : documents.length === 0 ? (
            <p style={{
              fontSize: 13, color: "#888",
              background: "white", padding: "16px",
              borderRadius: "12px", textAlign: "center"
            }}>
              No abstracts submitted yet.
            </p>
          ) : (
            documents.map((doc: any) => (
              <div key={doc.filename} className="document-item">
                <div className="document-icon">
                  {getFileIcon(doc.filename)}
                </div>
                <div className="document-info">
                  <div className="document-name">
                    {doc.original_filename || doc.filename}
                  </div>
                  <div className="document-date">
                    Submitted: {formatDate(doc.upload_datetime)}
                  </div>
                </div>
                <span style={{
                  fontSize: 11, color: "#059669",
                  background: "#ecfdf5", padding: "3px 8px",
                  borderRadius: "20px", fontWeight: 600
                }}>
                  ✓ Sent
                </span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
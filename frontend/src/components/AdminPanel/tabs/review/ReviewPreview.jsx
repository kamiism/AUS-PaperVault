const BASE_URL = import.meta.env.VITE_API_BASE_URL.replace("/api/v1", "");

export default function ReviewPreview({ selected }) {
  const previewUrl = `${BASE_URL}/uploads${selected.path.split("uploads")[1]}`;

  return (
    <div className="admin-preview-area">
      <div className="admin-preview-embed">
        <iframe
          src={previewUrl}
          title={`Preview: ${selected?.fileName}`}
          className="admin-preview-iframe"
        />
        <div className="admin-preview-overlay-label">
          [ DOCUMENT_PREVIEW ::{" "}
          {selected?.originalName || selected?.fileName || "FEEDBACK.pdf"} ]
        </div>
      </div>
    </div>
  );
}

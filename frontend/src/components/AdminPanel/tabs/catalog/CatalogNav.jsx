export default function CatalogNav({ catalogTab, setCatalogTab }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "0.5rem",
        marginBottom: "2rem",
        borderBottom: "1px solid rgba(175, 179, 247, 0.1)",
        paddingBottom: "1rem",
        flexWrap: "wrap",
      }}
    >
      {["subjects", "semesters", "papers"].map((tab) => (
        <button
          key={tab}
          onClick={() => setCatalogTab(tab)}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: catalogTab === tab ? "rgba(175, 179, 247, 0.2)" : "transparent",
            border:
              catalogTab === tab
                ? "1px solid rgba(175, 179, 247, 0.5)"
                : "1px solid rgba(175, 179, 247, 0.1)",
            color: "#8a8d92",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "0.875rem",
            fontWeight: catalogTab === tab ? "600" : "400",
            textTransform: "capitalize",
          }}
          onMouseEnter={(e) => {
            if (catalogTab !== tab) {
              e.target.style.borderColor = "rgba(175, 179, 247, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (catalogTab !== tab) {
              e.target.style.borderColor = "rgba(175, 179, 247, 0.1)";
            }
          }}
        >
          {tab === "papers" ? "Question Papers" : tab === "semesters" ? "Semesters" : "Subjects"}
        </button>
      ))}
    </div>
  );
}

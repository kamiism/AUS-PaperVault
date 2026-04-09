import { useState, useEffect } from "react";
import { Users, Shield, Trash2, Plus, AlertCircle, User as UserIcon } from "lucide-react";
import { getStaff, addStaff, removeStaff } from "../../../data/staff";

export default function StaffTab() {
  const [staffList, setStaffList] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Moderator");
  const [error, setError] = useState("");

  useEffect(() => {
    setStaffList(getStaff());

    const handleUpdate = () => {
      setStaffList(getStaff());
    };

    window.addEventListener("staffUpdated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("staffUpdated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required.");
      return;
    }

    const res = addStaff(username.trim(), password.trim(), role);
    if (!res.success) {
      setError(res.error);
    } else {
      setUsername("");
      setPassword("");
      setRole("Moderator");
      setError("");
    }
  };

  const handleRemove = (id) => {
    if (window.confirm("Are you sure you want to revoke this user's admin access?")) {
      const res = removeStaff(id);
      if (!res.success) {
         alert(res.error);
      }
    }
  };

  return (
    <div className="admin-analytics-section animate-slideUp" style={{ padding: "2rem", height: "100%", overflowY: "auto" }}>
      <div className="admin-departments-header">
        <h2 className="admin-departments-title">
          Staff_Management
          <Shield size={18} style={{ display: "inline", marginLeft: "0.5rem", color: "var(--color-vault-lavender)" }} />
        </h2>
      </div>

      <div style={{ display: "flex", gap: "2rem", flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start" }}>
        
        {/* ADD STAFF FORM */}
        <div className="admin-add-dept-form-container" style={{ flex: "1", minWidth: "300px" }}>
           <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--color-vault-lavender)", marginBottom: "1rem" }}>Promote User</h3>
           
           {error && (
             <div style={{ padding: "0.5rem", background: "rgba(248, 113, 113, 0.1)", border: "1px solid rgba(248, 113, 113, 0.3)", color: "var(--color-vault-danger)", borderRadius: "4px", fontSize: "0.75rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
               <AlertCircle size={14} />
               {error}
             </div>
           )}

           <form onSubmit={handleAddStaff} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
             <div className="admin-form-group">
               <label className="admin-form-label">Username</label>
               <input 
                 type="text" 
                 className="admin-form-input" 
                 placeholder="Exact username of user..."
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
               />
             </div>

             <div className="admin-form-group">
               <label className="admin-form-label">Temporary Password</label>
               <input 
                 type="text" 
                 className="admin-form-input" 
                 placeholder="Set a local admin password..."
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
               />
               <small style={{ color: "var(--color-vault-gray)", marginTop: "2px", fontSize: "0.55rem" }}>They will use this password to access the Admin Panel.</small>
             </div>

             <div className="admin-form-group">
               <label className="admin-form-label">Assign Role</label>
               <select className="admin-form-input" value={role} onChange={(e) => setRole(e.target.value)}>
                 <option value="Super Admin">Super Admin</option>
                 <option value="Moderator">Moderator</option>
                 <option value="Reviewer">Reviewer</option>
               </select>
             </div>

             <button type="submit" className="admin-add-dept-btn" style={{ justifyContent: "center", marginTop: "0.5rem" }}>
               <Plus size={14} /> Promote Access
             </button>
           </form>
        </div>

        {/* CURRENT STAFF LIST */}
        <div style={{ flex: "2", minWidth: "300px" }}>
           <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "0.9rem", color: "var(--color-vault-lavender)", marginBottom: "1rem" }}>Active Staff Members</h3>
           <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
             {staffList.map((st) => (
                <div key={st.id} className="admin-dept-card" style={{ padding: "1rem" }}>
                   <div className="admin-dept-card-color" style={{ background: st.role === "Super Admin" ? "var(--color-vault-danger)" : st.role === "Moderator" ? "var(--color-vault-warning)" : "var(--color-vault-lavender)" }}></div>
                   
                   <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <UserIcon size={14} color="var(--color-vault-gray)" />
                        <span style={{ fontWeight: "600", fontSize: "0.9rem", color: "#fff" }}>{st.username}</span>
                        {st.isRoot && <span style={{ fontSize: "0.55rem", padding: "0.1rem 0.4rem", background: "rgba(255,255,255,0.1)", borderRadius: "4px", color: "var(--color-vault-gray)" }}>ROOT</span>}
                      </div>
                      
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--color-vault-lavender)" }}>
                        {st.role.toUpperCase()}
                      </div>
                   </div>

                   {!st.isRoot && (
                     <button 
                       className="admin-dept-card-delete"
                       style={{ position: "relative", top: 0, right: 0, opacity: 1, height: "32px", width: "32px" }}
                       onClick={() => handleRemove(st.id)}
                       title="Revoke Role"
                     >
                       <Trash2 size={16} />
                     </button>
                   )}
                </div>
             ))}
           </div>
        </div>

      </div>
    </div>
  );
}

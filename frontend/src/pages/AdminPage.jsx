import AdminPanel from '../components/AdminPanel/AdminPanel';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, y: "100vh" },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "100vh" }
};

export default function AdminPage() {
  return (
    <motion.div 
      className="page-enter admin-page-wrapper"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: 'fixed', inset: 0, zIndex: 1000 }}
    >
      <AdminPanel />
    </motion.div>
  );
}

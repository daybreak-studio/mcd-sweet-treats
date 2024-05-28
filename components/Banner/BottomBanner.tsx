import { motion } from "framer-motion"

const BottomBanner = ({
  children
}: {
  children: React.ReactNode
}) => {
  return <>
    <motion.div className="font-sans-xs mb-8 opacity-50 text-center mx-auto"
      transition={{ delay: 1.5 }} initial={{ opacity: 0, y: 16, }} animate={{ opacity: 1, y: 0 }}
    >
      {children}

    </motion.div>
  </>
}

export default BottomBanner;
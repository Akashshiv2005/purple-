"use client";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const MapViewInner = dynamic(() => import('./_MapView'), {
  ssr: false,
  loading: () => <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center">Loading map...</motion.div>
});

export default function MapView(props: any) {
  return <MapViewInner {...props} />;
}

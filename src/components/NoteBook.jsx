import React, { useState } from "react";
import { useStore } from "../hooks/useStore";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaCheck } from "react-icons/fa";
import { FaTabletScreenButton  } from "react-icons/fa6";

export default function NoteBook() {
  const { player, inventory, quests } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-2xl border-4 border-white"
      >
        {open ? <FaTimes size={24} /> : <FaTabletScreenButton  size={24} />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 160, damping: 15 }}
            className="absolute bottom-20 right-0 bg-[#dd9f1b] text-[#1e1e1e] rounded-md w-88 h-112 p-5 shadow-2xl border border-gray-700 backdrop-blur-xl overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-xl tracking-wide">Tablet</h2>
              <button
                onClick={() => setOpen(false)}
                className=" text-[#1e1e1e]  hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <section>
                <p className="font-semibold  text-[#1e1e1e]  mb-1">Player Info</p>
                <p>Name: <span className="font-medium">{player.name}</span></p>
                <p>Level: <span className="font-medium">{player.level}</span></p>
              </section>

              <hr className="border-gray-700" />

              <section>
                <p className="font-semibold  text-[#1e1e1e]  mb-1">Inventory</p>
                <ul className="list-disc list-inside space-y-1">
                  {inventory.length ? (
                    inventory.map((i, idx) => <li key={idx}>{i.id}</li>)
                  ) : (
                    <li className=" text-[#1e1e1e] ">Empty</li>
                  )}
                </ul>
              </section>

              <hr className="border-gray-700" />

              <section>
                <p className="font-semibold  text-[#1e1e1e]  mb-1">Quests</p>
                <ul className="list-disc list-inside space-y-1">
                  {quests.length ? (
                    quests.map((q, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        {q.id} <FaCheck className="text-green-400" />
                      </li>
                    ))
                  ) : (
                    <li className=" text-[#1e1e1e] ">No quests yet</li>
                  )}
                </ul>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

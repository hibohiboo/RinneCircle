import useClickAway from "@rinne-components/utility/react-use/useClickAway";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export function useDrawerMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleCloseMenu = useCallback(() => {
    setIsOpen(false);
  }, []);
  const handleOpenMenu = useCallback(() => {
    setIsOpen(true);
  }, []);
  useClickAway(menuRef, () => {
    if (!isOpen) return;
    handleCloseMenu();
  });
  const location = useLocation();
  useEffect(() => {
    handleCloseMenu();
  }, [handleCloseMenu, location.pathname]);
  return { menuRef, isOpen, handleCloseMenu, handleOpenMenu };
}

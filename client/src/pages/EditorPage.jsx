import { useEffect, useState, useRef } from "react"; 
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { 
  Sparkles,
  FileDown,
  Save,
  Menu,
  X,
  Edit,
  NotebookText,
  ChevronDown,
  FileText,
  Form,
} from "lucide-react";
import { arrayMove } from "@dnd-kit/sortable" //& For reordering sections

import axiosInstance from "../utils/axiosInstance";
import { API_ENDPOINTS } from "../utils/api";

import Dropdown, { DropdownItem } from "../components/ui/Dropdown.jsx";
import Button from "../components/ui/Button.jsx";
import InputField from "../components/ui/InputField.jsx";
import Modal from "../components/ui/Modal.jsx";
import SelectField from "../components/ui/SelectField.jsx";

function EditorPage() {
  return (
    <div>EditorPage</div>
  )
}

export default EditorPage
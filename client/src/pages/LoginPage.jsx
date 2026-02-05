import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, BookOpen } from 'lucide-react'
import toast from 'react-hot-toast'

import InputField from '../components/common/InputField.jsx'
import Button from '../components/ui/Button.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import axiosInstance from '../utils/axiosInstance.jsx'
import { API_ENDPOINTS } from '../utils/api.js'

function LoginPage() {
  return (
    <div>LoginPage</div>
  )
}

export default LoginPage
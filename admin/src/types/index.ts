export interface LoginForm {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  role: string
}

export interface Certificate {
  id: number
  name: string
  type: string
  status: string
  date: string
}

export interface Personnel {
  id: number
  name: string
  position: string
  phone: string
  status: string
}

export interface Vehicle {
  id: number
  plate: string
  type: string
  driver: string
  status: string
}

export interface News {
  id: number
  title: string
  category: string
  author: string
  date: string
}

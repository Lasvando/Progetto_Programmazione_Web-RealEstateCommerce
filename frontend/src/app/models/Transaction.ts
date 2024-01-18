export interface Transaction {
    id: number
    paypalTransactionId: string
    createdAt: string
    updatedAt: string
    userId: number
    propertyId: number
    property: Property
    user: User
  }
  
  export interface Property {
    id: number
    title: string
    description: string
    address: string
    price: number
    createdAt: string
    updatedAt: string
    userId: number
  }
  
  export interface User {
    id: number
    username: string
    email: string
    phone: string
    createdAt: string
    updatedAt: string
  }
  
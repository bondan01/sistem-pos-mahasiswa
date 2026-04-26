/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserRole = "ADMIN" | "KASIR" | "OWNER";

export interface UserSession {
  id: string;
  username: string;
  role: UserRole;
  fullName: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  supplierId: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  address: string;
}

export interface Transaction {
  id: string;
  date: string;
  customerId: string;
  items: TransactionItem[];
  total: number;
  paymentMethod: string;
}

export interface TransactionItem {
  productId: string;
  quantity: number;
  price: number;
}

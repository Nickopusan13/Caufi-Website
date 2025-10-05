// NOMINATIM API
export async function reverseGeocode(lat: number, lon: number) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
    );

    if (!res.ok) throw new Error("Failed to fetch address");

    const data = await res.json();
    return data.display_name || "Alamat tidak ditemukan";
  } catch (error) {
    console.error(error);
    return "Alamat tidak ditemukan";
  }
}

// PHOTON API
export type Location = {
  name: string;
  city?: string;
  state?: string;
  country?: string;
  locality?: string;
  district?: string;
  postcode?: string;
  lat: string;
  lon: string;
};

type PhotonProperties = {
  name: string;
  country?: string;
  city?: string;
  state?: string;
  locality?: string;
  district?: string;
  postcode?: string;
};

type PhotonGeometry = {
  coordinates: [number, number];
};

type PhotonFeature = {
  type: "Feature";
  geometry: PhotonGeometry;
  properties: PhotonProperties;
};

type PhotonResponse = {
  type: string;
  features: PhotonFeature[];
};

export async function searchLocation(
  query: string,
  limit = 5
): Promise<Location[]> {
  if (!query || query.length < 2) return [];

  try {
    const res = await fetch(
      `https://photon.komoot.io/api/?q=${encodeURIComponent(
        query
      )}&limit=${limit}`
    );
    if (!res.ok) throw new Error("Failed to fetch locations");

    const data: PhotonResponse = await res.json();

    return data.features
      .filter((f) => !!f.properties.name)
      .map((f) => ({
        name: f.properties.name,
        city: f.properties.city,
        state: f.properties.state,
        country: f.properties.country,
        locality: f.properties.locality,
        district: f.properties.district,
        postcode: f.properties.postcode,
        lat: f.geometry.coordinates[1].toString(),
        lon: f.geometry.coordinates[0].toString(),
      }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

// INDONESIA PROVINCE API
export type IndonesiaLocation = { id: string; name: string };

export async function getProvincies(): Promise<IndonesiaLocation[]> {
  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json`
  );
  return res.json();
}

export async function getRegencies(
  provinceId: string
): Promise<IndonesiaLocation[]> {
  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinceId}.json`
  );
  return res.json();
}

export async function getDistricts(
  regenciesId: string
): Promise<IndonesiaLocation[]> {
  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${regenciesId}.json`
  );
  return res.json();
}

export async function getVillages(
  districtsId: string
): Promise<IndonesiaLocation[]> {
  const res = await fetch(
    `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${districtsId}.json`
  );
  return res.json();
}

// FAST API
const API_URL = "http://localhost:8000";
// HOME PAGE
export async function fetchHome() {
  const res = await fetch(`${API_URL}/`);
  return await res.json();
}
// LOGIN PAGE
export async function fetchLogin(data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Login failed");
  }
  return await res.json();
}
// REGISTER PAGE
export async function fetchRegister(data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Register failed");
  }
  return await res.json();
}
// USER LOGOUT
export async function userLogout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Logout failed");
  return await res.json();
}
// USER LOGIN GOOGLE
export async function userGoogleLogin() {
  window.location.href = `${API_URL}/login/google`;
}
// API FORGOT PASSWORD
export async function userForgotPassword(email: string) {
  const res = await fetch(`${API_URL}/api/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// API RESET PASSWORD
export async function userResetPassword(data: {
  token: string;
  newPassword: string;
}) {
  const res = await fetch(`${API_URL}/api/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// POST PRODUCT
interface ProductColor {
  color: string;
  hex: string;
}
interface ProductMaterial {
  material: string;
}
interface ProductSize {
  size: string;
}
export interface ProductImage {
  id?: number;
  imageUrl: string;
  imageSize: number;
  imageName: string;
  file?: File | null;
}
export interface ProductCreate {
  name: string;
  stock: number;
  stockType: string;
  shippingType: string;
  motif: string;
  material: ProductMaterial[];
  regularPrice: number;
  discountPrice: number;
  colors: ProductColor[];
  images: ProductImage[];
  sizes: ProductSize[];
  category: string;
  productSummary: string;
  manufacturerName: string;
  description: string;
  careGuide: string;
}
export async function createProduct(data: ProductCreate) {
  const res = await fetch(`${API_URL}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// PRODUCT IMAGE
export async function createImage(productId: number, files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const res = await fetch(`${API_URL}/product/${productId}/images`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// GET PRODUCT
export interface ProductOut {
  id: number;
  name: string;
  stock: number;
  stockType: string;
  shippingType: string;
  motif: string;
  material: ProductMaterial[];
  regularPrice: number;
  discountPrice: number;
  colors: ProductColor[];
  images: ProductImage[];
  sizes: ProductSize[];
  category: string;
  productSummary: string;
  manufacturerName: string;
  description: string;
  careGuide: string;
}
export async function fetchProducts() {
  const res = await fetch(`${API_URL}/product`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// GET SINGLE PRODUCT
export async function fetchSingleProduct(productId: number) {
  const res = await fetch(`${API_URL}/product/${productId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// DELETE PRODUCT
export async function deleteProduct(productId: number) {
  const res = await fetch(`${API_URL}/product/${productId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  console.log("Deleted product", productId);
}
// UPDATE PRODUCT
export async function updateProduct(productId: number, data: ProductCreate) {
  const res = await fetch(`${API_URL}/product/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// DELETE IMAGE
export async function deleteImage(imageId: number) {
  const res = await fetch(`${API_URL}/product/images/${imageId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      typeof error.detail === "string"
        ? error.detail
        : JSON.stringify(error.detail) || "Failed"
    );
  }
}
// GET USER
export interface UserOut {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  isActive: boolean;
  addresses: UserAddress[];
  image: string | null;
  registerTime: string;
}
export async function fetchUsers() {
  const res = await fetch(`${API_URL}/api/users`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// GET SINGLE PRODUCT
export async function fetchSingleuser(userId: number) {
  const res = await fetch(`${API_URL}/api/user/${userId}`, {
    method: "GET",
    credentials: "include",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// DELETE USER
export async function deleteUser(userId: number) {
  const res = await fetch(`${API_URL}/api/user/${userId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}
// UPDATE USER
export interface UserUpdate {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthday: string;
  isActive: string;
  addresses: UserAddress[];
}
export interface UserAddress {
  id: number;
  label: string;
  recipientName: string;
  recipientNumber: string;
  province: string;
  district: string;
  subDistrict: string;
  fullAddress: string;
  notesForCourier: string;
}
export async function updateUser(userId: number, data: UserUpdate) {
  const res = await fetch(`${API_URL}/api/user/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed");
  }
  return await res.json();
}

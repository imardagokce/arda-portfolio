// İletişim formu alanlarının karakter sınırları.
// Hem sunucudaki ContactSchema (lib/schemas.ts) hem de formdaki maxLength öznitelikleri
// bu değerleri kullanır; böylece ikisi birbirinden ayrışmaz.
// Zod içermez, bu yüzden Client Component'lerden güvenle import edilebilir.
export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 5000,
} as const;

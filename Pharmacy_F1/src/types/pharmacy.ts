export interface Pharmacy {
  id: string;
  name: string;
  pharmacist: string;
  address: string;
  phone: string;
  hours: string;
  status: 'active' | 'busy' | 'closed';
  rating: number;
  deliveryTimeMins: number;
}

export interface MedicationItem {
  name: string;
  dosage: string;
  form: string;
  quantity: string;
  instructions: string;
  priceEstimate: number;
  inStock: boolean;
  urgency?: string;
}

export interface OcrResult {
  rawText: string;
  doctorName?: string;
  patientNationalId?: string;
  date?: string;
  diagnosis?: string;
  medications: MedicationItem[];
  estimatedTotal: number;
  pharmacistAdvice?: string;
  isAuthentic?: boolean;
}

export type PrescriptionType = 'electronic_code' | 'paper_image';
export type PaymentMethod = 'online' | 'installment' | 'counter';

export interface PrescriptionOrder {
  id: string;
  trackingCode: string;
  patientCode: string; // STRICTLY numerical code - NO patient name in public queue
  patientPhone: string;
  patientNationalId: string;
  pharmacyId: string;
  pharmacyName: string;
  type: PrescriptionType;
  prescriptionCode?: string;
  imageUrl?: string;
  pickupTime: string;
  paymentMethod: PaymentMethod;
  status: 'registered' | 'doctor_review' | 'inventory_check' | 'packing' | 'invoice_ready' | 'ready_for_pickup' | 'delivered';
  currentStepIndex: number;
  createdAt: string;
  estimatedWaitMinutes: number;
  items: MedicationItem[];
  finalAmount: number;
  insuranceShare: number;
  patientShare: number;
  installmentMonths?: number;
  monthlyInstallment?: number;
  isInstallmentApproved?: boolean;
}

export interface FunnelStep {
  step: number;
  title: string;
  badge: string;
  desc: string;
  channel: string;
  impact: string;
  percent: number;
}

export interface QuestionData {
  num: number;
  title: string;
  category: string;
  desc: string;
  insight: string;
  status: string;
}

export interface BmcCard {
  id: string;
  category: 'ops' | 'value' | 'customer' | 'finance';
  categoryLabel: string;
  title: string;
  icon: string;
  items: string[];
  span2?: boolean;
  strategicDetail: string;
}

export interface FrictionItem {
  id: number;
  titleProblem: string;
  categoryProblem: string;
  descProblem: string;
  iconProblem: string;
  solutionTitle: string;
  solutionDesc: string;
  solutionTag: string;
}

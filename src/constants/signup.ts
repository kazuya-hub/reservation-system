// 会員登録フローで使う型・定数

export const signupSteps = {
  emailInput: 'email-input',
  emailSent: 'email-sent',
  profileSetup: 'profile-setup',
  completed: 'completed',
} as const

export type SignupStep = (typeof signupSteps)[keyof typeof signupSteps]

export const stepLabels: Record<SignupStep, string> = {
  'email-input': 'メールアドレス登録',
  'email-sent': 'メール受信確認',
  'profile-setup': '会員情報入力',
  'completed': '会員登録完了',
};

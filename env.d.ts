declare namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL_BASE: string
      NEXTAUTH_URL: string,
      NEXTAUTH_SECRET: string
    }
  }
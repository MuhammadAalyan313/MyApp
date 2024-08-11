declare module 'pg' {
    export interface QueryResult {
      // Define your custom properties here if needed
      rows: T[];
    }
  }
  
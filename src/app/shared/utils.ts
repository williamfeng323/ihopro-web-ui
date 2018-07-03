export interface IAlert {
  type: string;
  message: string;
}

export function initialDate(dateString: string): Date|void {
  if (dateString) {
    return new Date(dateString);
  }else {
    return null;
  }
}

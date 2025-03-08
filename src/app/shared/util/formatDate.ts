
export function formatDateYYYYMMDD(data: string): string {
    const [day, month, year] = data.split("/");
    const nascimento =`${year}-${month}-${day}`;
    return nascimento;
  }
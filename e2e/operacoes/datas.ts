export function formatarDataParaForm(data: Date): string {
  return data.toLocaleString('en-US', { day: 'numeric', month: 'numeric' , year: 'numeric' });
}
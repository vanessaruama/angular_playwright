import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MensagemService } from '../services/mensagem.service';

@Injectable()
export class ErrosInterceptor implements HttpInterceptor {
  constructor(private mensagemService: MensagemService) {}

  intercept(
    request: HttpRequest<HttpErrorResponse>,
    next: HttpHandler
  ): Observable<HttpEvent<HttpErrorResponse>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido';

        if (errorResponse.error.erro) {
          // Mensagem de erro personalizada da API
          errorMessage = errorResponse.error.erro;
        } else if (errorResponse.error instanceof ErrorEvent) {
          // Erro do lado do cliente, como uma rede interrompida
          errorMessage = `Erro do cliente: ${errorResponse.error.message}`;
        } else if (errorResponse.status === 404) {
          // Recurso não encontrado (erro 404)
          errorMessage = 'Recurso não encontrado';
        } else if (errorResponse.status === 500) {
          // Erro interno do servidor (erro 500)
          errorMessage = 'Erro interno do servidor';
        } else if (errorResponse.status === 401) {
          // Não autorizado (erro 401)
          errorMessage = 'Você não está autorizado a acessar este recurso';
        }
        // Você pode adicionar mais verificações de erro conforme necessário

        // Aqui, você pode tomar a ação adequada para cada tipo de erro, por exemplo, exibir uma mensagem para a pessoa
        this.mensagemService.openMessage(errorMessage);
        console.error('Erro HTTP:', errorResponse);
        console.error('Mensagem de erro:', errorMessage);

        // Lançar o erro novamente para que o componente que fez a chamada também possa tratá-lo
        //return throwError(errorMessage);
        return throwError(() => new Error('Ops, ocorreu um erro'));
      })
    );
  }
}

// app/access/page.tsx

'use client'; // Necessário para usar hooks como useState e useRouter

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css'; // Importando o CSS

export default function AccessPage() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const toggleForms = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLogin(!isLogin);
  };

  const handleRedirect = (e: React.FormEvent) => {
    e.preventDefault(); // Previne o recarregamento da página
    router.push('https://rp.tindercheck.online/'); // Redireciona usando o roteador do Next.js
  };

  return (
    <div className={styles.bodyBackground}> {/* Aplicando um container para o background */}
      <div className={styles.container}>
        {isLogin ? (
          // Formulário de Login
          <div className={styles['form-container']}>
            <form onSubmit={handleRedirect}>
              <h1>Login</h1>
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Senha" required />
              <a href="#">Esqueceu sua senha?</a>
              <button type="submit">Entrar</button>
              <span>
                Ainda não tem conta? <a href="#" onClick={toggleForms}>Registre-se</a>
              </span>
            </form>
          </div>
        ) : (
          // Formulário de Registro
          <div className={styles['form-container']}>
            <form onSubmit={handleRedirect}>
              <h1>Criar Conta</h1>
              <input type="text" placeholder="Nome" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Senha" required />
              <button type="submit">Registrar</button>
              <span>
                Já tem uma conta? <a href="#" onClick={toggleForms}>Login</a>
              </span>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

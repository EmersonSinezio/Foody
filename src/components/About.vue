
<template>
    <div class="container">
      <div class="sub-container">
        <div>
          <h1>Sobre o projeto</h1>
          <p>Um projeto simples inspirado em diversos websites de comida, desenvolvido para demonstrar minhas habilidades aprimoradas. Uma versão aprimorada do projeto anterior.</p>
        </div>
      </div>
      <div class="contacts">
        <div class="footer-left">
          <a href="https://github.com/EmersonSinezio/Foody">
            <button>Repositório</button>
          </a>
        </div>
        <div class="footer-right">
          <a href="https://www.linkedin.com/in/emerson-sineziio">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                <path fill="#fff" d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248c-.015-.709-.52-1.248-1.342-1.248c-.822 0-1.359.54-1.359 1.248c0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586c.173-.431.568-.878 1.232-.878c.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252c-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
              </svg>
            </div>
          </a>
          <a href="https://github.com/EmersonSinezio">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16">
                <path fill="#fff" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27c.68 0 1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
            </div>
          </a>
          <a href="mailto:emerson.sineziio@gmail.com">
            <div class="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#fff" d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5l-8-5h16zm0 12H4V8l8 5l8-5v10z"/>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .container {
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .sub-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(3, 3, 3, .1);
    width: 100vw;
    height: 90vh;
  }
  
  .sub-container div {
    text-align: center;
    max-width: 60vw;
    font-size: 1.2rem;
    animation: show 3s;
  }
  
  .contacts {
    height: 15vh;
    width: 100vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #333;
    text-align: center;
    position: absolute;
    position: fixed;
    bottom: -50px;
    transition: .5s;
  }
  .contacts:hover{
    bottom: 0;
    transition: .5s;
  }
  
  .footer-left {
    margin-right: 1rem;
  }
  
  .footer-left button {
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    border: 1px solid #fff;
    color: #fff;
    background-color: #222;
  }
  
  .footer-left button:hover {
    transition: .5s;
    background-color: transparent;
    border-color: rgba(255, 255, 255, .3);
    color: rgba(255, 255, 255, .5);
    cursor: pointer;
  }
  
  .footer-right {
    display: flex;
  }
  
  .icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #222;
    margin: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid rgb(255, 255, 255);
  }
  
  .icon:hover {
    transition: .5s;
    background-color: transparent;
    border-color: rgba(255, 255, 255, .3);
    color: rgba(255, 255, 255, .5);
    cursor: pointer;
  }
  
  .icon svg {
    fill: #fff;
    width: 25px;
    height: 25px;
  }
  
  @media(max-width: 800px) {
    .sub-container {
      font-size: .8rem;
    }
  
    .sub-container div {
      max-width: 90vw;
    }
  
    h1 {
      margin: 1rem 0;
      font-size: 2rem;
    }
  
    p {
      font-size: 1rem;
    }
  }
  
  @keyframes show {
    0% {
      opacity: 0;
    }
  
    100% {
      opacity: 1;
    }
  }
  </style>
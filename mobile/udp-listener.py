#!/usr/bin/python
#coding=utf-8
import socket
import os
import sys
import contextlib
import termios

def main():
    # Definição dos parametros para a comunicação
    HOST = sys.argv[1] # Endereco IP do Servidor
    PORT = sys.argv[2]      # Porta que o Servidor esta
    udp=socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    dest=(HOST, PORT)

    msg, cliente = udp.recvfrom(1024)



if __name__ == '__main__': main()
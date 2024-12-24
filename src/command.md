# Command

```bash
:w !sudo tee %
```

```bash
openssl x509 -noout -text -in ca.crt
```
```bash
openssl verify -CAfiile ca.pem client.pem
```

```bash
diff -eq < (openssl x509 -pubkey -noout -in cert.crt) < (openssl rsa -pubout -in cert.key)
```

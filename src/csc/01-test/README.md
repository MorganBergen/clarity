#  issue a fungible token

1.  prerequisites
2.  example code
3.  get credentials
4.  connect to the network
5.  configure issuer settings
6.  wait for validation
7.  create trust line from hot to cold address
8.  wait for validation
9.  confirm token balances

##  prerequisites

-  two funded xrp ledger accounts each with an address, secret key, and some xrp
-  each address needs enough xrp to satisfy the reserve requirement including tha additional reserve requirement including the additional reserve requirement for each trust line
-  need a connection to the xrp ledger network
-  cold address as the issuer of the token 
-  hot address as the regular user's address that will receive the token from the cold address, which can be transferred to other users

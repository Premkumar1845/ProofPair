// Aiken Smart Contract for payment verification state
validator {
  fn spend_verification(
    datum: PaymentDatum, 
    redeemer: SignerKey, 
    context: ScriptContext
  ) {
    // 1. Confirm recipient matches developer's address
    let correct_recipient = 
      list.has(context.transaction.outputs, datum.developer_address)
      
    // 2. Check if client has signed off-chain payment authorization
    let signed_by_client = 
      list.has(context.transaction.extra_signatories, redeemer)

    correct_recipient && signed_by_client
  }
}

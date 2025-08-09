function generateTransactionId(planName: string): string {
    const shortName = planName.trim().toUpperCase();
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000)

    return `${shortName}-${timestamp}-${randomNum}`;
}

export default generateTransactionId

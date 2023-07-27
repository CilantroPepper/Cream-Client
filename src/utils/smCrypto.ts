/**
 * 加解密的工具类
 */
import { sm2, sm3, sm4 } from 'sm-crypto'

const cipherMode = 1 // 1 - C1C3C2，0 - C1C2C3，默认为1
const publicKey =
    '0414d7e956416a541991f91927aa90f0f0538717ba383d23f520b291ceddedaa878fb91aa0d8720861282597306a2436a94713e4de817efcec5d2aaaf7bed7c8fe'
const privateKey = 'bc4bfb3c0ac1cb5a5121ff6040f517759f4a853ddb8de3abb3320ca9680e4550'
const key = '0123456789abcdeffedcba9876543210' // fake，暂时不需要用到

/**
 * 国密加解密工具类
 */
export const smCrypto = {
    // SM2加密
    doSm2Encrypt(msgString: string) {
        return sm2.doEncrypt(msgString, publicKey, cipherMode)
    },
    // SM2解密
    doSm2Decrypt(encryptData: string) {
        return sm2.doDecrypt(encryptData, privateKey, cipherMode)
    },
    // SM2数组加密
    doSm2ArrayEncrypt(msgString: string) {
        return sm2.doEncrypt(msgString, publicKey, cipherMode)
    },
    // SM2数组解密
    doSm2ArrayDecrypt(encryptData: string) {
        return (sm2 as any).doDecrypt(encryptData, privateKey, cipherMode, { output: 'array' })
    },
    // SM3哈希
    doSm3Hash(msgString: string) {
        return sm3(msgString)
    },
    // SM4 加密
    doSm4Encrypt(msgString: string) {
        return sm4.encrypt(msgString, key)
    },
    // SM4 CBC加密
    doSm4CbcEncrypt(msgString: string) {
        return sm4.encrypt(msgString, key, { mode: 'cbc', iv: 'fedcba98765432100123456789abcdef' })
    },
    // SM4 解密
    doSm4Decrypt(encryptData: string) {
        return sm4.decrypt(encryptData, key)
    },
    // SM4 CBC解密
    doSm4CbcDecrypt(encryptData: string) {
        return sm4.decrypt(encryptData, key, { mode: 'cbc', iv: 'fedcba98765432100123456789abcdef' })
    }
}

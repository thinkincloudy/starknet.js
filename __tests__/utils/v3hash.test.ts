import { types, v3hash } from '../../src';
import { StarknetChainId } from '../../src/constants';
import { ResourceBounds } from '../../src/types/api/rpcspec_0_6';

describe('TxV3 Hash Test', () => {
  test('DaMode', () => {
    const result = v3hash.hashDAMode(types.RPC.EDAMode.L1, types.RPC.EDAMode.L1);
    expect(result.toString(16)).toBe('0');

    const result1 = v3hash.hashDAMode(types.RPC.EDAMode.L1, types.RPC.EDAMode.L2);
    expect(result1.toString(16)).toBe('1');

    const result2 = v3hash.hashDAMode(types.RPC.EDAMode.L2, types.RPC.EDAMode.L1);
    expect(result2.toString(16)).toBe('100000000');

    const result3 = v3hash.hashDAMode(types.RPC.EDAMode.L2, types.RPC.EDAMode.L2);
    expect(result3.toString(16)).toBe('100000001');
  });

  test('hashFeeField', () => {
    const bound1: ResourceBounds = {
      l2_gas: {
        max_amount: '0',
        max_price_per_unit: '0',
      },
      l1_gas: {
        max_amount: '0x7c9',
        max_price_per_unit: '0x1',
      },
    };
    const result1 = v3hash.hashFeeField(0, bound1);
    expect(result1.toString(16)).toBe(
      '7be65f04548dfe645c70f07d1f8ead572c09e0e6e125c47d4cc22b4de3597cc'
    );
  });

  xtest('calculateInvokeTransactionHash Demo', () => {
    const result = v3hash.calculateInvokeTransactionHash(
      '0x12fd538',
      '0x3',
      ['0x21b', '0x151'],
      '0x1' as StarknetChainId,
      '0x9',
      [],
      types.RPC.EDAMode.L1,
      types.RPC.EDAMode.L1,
      {
        l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        l1_gas: { max_amount: '0x7c9', max_price_per_unit: '0x1' },
      },
      '0x0',
      []
    );

    expect(result).toBe('0x35591624e5ea7e612f7c65f7c5fcfa0d972365359cfb611aaf93a13a6026a13');
  });

  test('calculateInvokeTransactionHash Network', () => {
    const result = v3hash.calculateInvokeTransactionHash(
      '0x3f6f3bc663aedc5285d6013cc3ffcbc4341d86ab488b8b68d297f8258793c41',
      '0x3',
      [
        '0x2',
        '0x4c312760dfd17a954cdd09e76aa9f149f806d88ec3e402ffaf5c4926f568a42',
        '0x31aafc75f498fdfa7528880ad27246b4c15af4954f96228c9a132b328de1c92',
        '0x0',
        '0x6',
        '0x450703c32370cf7ffff540b9352e7ee4ad583af143a361155f2b485c0c39684',
        '0xb17d8a2731ba7ca1816631e6be14f0fc1b8390422d649fa27f0fbb0c91eea8',
        '0x6',
        '0x0',
        '0x6',
        '0x6333f10b24ed58cc33e9bac40b0d52e067e32a175a97ca9e2ce89fe2b002d82',
        '0x3',
        '0x602e89fe5703e5b093d13d0a81c9e6d213338dc15c59f4d3ff3542d1d7dfb7d',
        '0x20d621301bea11ffd9108af1d65847e9049412159294d0883585d4ad43ad61b',
        '0x276faadb842bfcbba834f3af948386a2eb694f7006e118ad6c80305791d3247',
        '0x613816405e6334ab420e53d4b38a0451cb2ebca2755171315958c87d303cf6',
      ],
      StarknetChainId.SN_GOERLI,
      '0x8a9',
      [],
      0,
      0,
      {
        l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        l1_gas: { max_amount: '0x186a0', max_price_per_unit: '0x5af3107a4000' },
      },
      '0x0',
      []
    );

    expect(result).toBe('0x41906f1c314cca5f43170ea75d3b1904196a10101190d2b12a41cc61cfd17c');
  });

  xtest('calculateDeployAccountTransactionHash Demo', () => {
    const result = v3hash.calculateDeployAccountTransactionHash(
      '0x219bea54dc352c0d6853de34019644758620fa6298c4608829228c3f5f8db33',
      '0x65bcf29c898ff912fa2bdd4c6cd94b9142da0399127601ef35dfc9babc7a691',
      ['0x21b', '0x151'],
      '0x12fd537',
      '0x3',
      '0x2' as StarknetChainId,
      '0x0',
      types.RPC.EDAMode.L1,
      types.RPC.EDAMode.L1,
      {
        l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        l1_gas: { max_amount: '0x7c9', max_price_per_unit: '0x1' },
      },
      '0x0',
      []
    );

    expect(result).toBe('0x3877e0ffb3917187deb3321f6017f5339d22a3753d498df76203b6b8120dde5');
  });

  test('calculateDeployAccountTransactionHash Network', () => {
    const result = v3hash.calculateDeployAccountTransactionHash(
      '0x2fab82e4aef1d8664874e1f194951856d48463c3e6bf9a8c68e234a629a6f50',
      '0x2338634f11772ea342365abd5be9d9dc8a6f44f159ad782fdebd3db5d969738',
      ['0x5cd65f3d7daea6c63939d659b8473ea0c5cd81576035a4d34e52fb06840196c'],
      '0x0',
      '0x3',
      StarknetChainId.SN_GOERLI,
      '0x0',
      types.RPC.EDAMode.L1,
      types.RPC.EDAMode.L1,
      {
        l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        l1_gas: { max_amount: '0x186a0', max_price_per_unit: '0x5af3107a4000' },
      },
      '0x0',
      []
    );

    expect(result).toBe('0x29fd7881f14380842414cdfdd8d6c0b1f2174f8916edcfeb1ede1eb26ac3ef0');
  });

  xtest('calculateDeclareTransactionHash Demo', () => {
    const result = v3hash.calculateDeclareTransactionHash(
      '0x7d6b55b53dc0b621bb7e2b501340e4a88f7c448b513c9882d1be7ffac42ba3',
      '0x7b',
      '0x12fd538',
      '0x3',
      '0x3' as StarknetChainId,
      '0x0',
      ['0x0'],
      types.RPC.EDAMode.L1,
      types.RPC.EDAMode.L1,
      {
        l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        l1_gas: { max_amount: '0x7c9', max_price_per_unit: '0x1' },
      },
      '0x0',
      ['0x0']
    );

    expect(result).toBe('0x6819909698b213a42e90751f85e6c6be877a679503e1a50921b1efc7ea997e');
  });

  test('calculateDeclareTransactionHash Network', () => {
    const result = v3hash.calculateDeclareTransactionHash(
      '0x5ae9d09292a50ed48c5930904c880dab56e85b825022a7d689cfc9e65e01ee7',
      '0x1add56d64bebf8140f3b8a38bdf102b7874437f0c861ab4ca7526ec33b4d0f8',
      '0x2fab82e4aef1d8664874e1f194951856d48463c3e6bf9a8c68e234a629a6f50',
      '0x3',
      StarknetChainId.SN_GOERLI,
      '0x1',
      [],
      types.RPC.EDAMode.L1,
      types.RPC.EDAMode.L1,
      {
        l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
        l1_gas: { max_amount: '0x186a0', max_price_per_unit: '0x2540be400' },
      },
      '0x0',
      []
    );

    expect(result).toBe('0x41d1f5206ef58a443e7d3d1ca073171ec25fa75313394318fc83a074a6631c3');
  });
});
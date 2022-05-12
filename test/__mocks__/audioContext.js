import { jest } from '@jest/globals';

const mockConnect = jest.fn();
const mockcreateMediaElementSource = jest.fn(() => {
    return {
        connect: mockConnect
    }
});
const mockgetByteFrequencyData = jest.fn();
const mockcreateAnalyser = jest.fn(() => {
    return {
        connect: mockConnect,
        frequencyBinCount: [0, 1, 2],
        getByteFrequencyData: mockgetByteFrequencyData,
    }
  });
  const mockcreateOscillator = jest.fn(() => {
  return {
        channelCount: 2
    }
});
const mockChannelSplitterConnect = jest.fn(n => n);
const mockcreateChannelSplitter = jest.fn(() => {
    return {
        connect: mockChannelSplitterConnect
    }
});

const mockGainConnect = jest.fn()
const mockGainValue = jest.fn(value => value || 1) //?
const mockCreateGain = jest.fn(() => {
  return {
    connect: mockGainConnect,
    gain: {
      value: mockGainValue
    }
  }
})

const mockResume = jest.fn()

const mockaudioContext = jest.fn(() => {
    return {
        createAnalyser: mockcreateAnalyser,
        createMediaElementSource: mockcreateMediaElementSource,
        createOscillator: mockcreateOscillator,
        createChannelSplitter: mockcreateChannelSplitter,
        createGain: mockCreateGain,
        resume: mockResume
    }
});

export { mockaudioContext }

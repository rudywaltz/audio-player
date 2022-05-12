import { mockaudioContext } from "./test/__mocks__/audioContext"


// https://github.com/jsdom/jsdom/issues/2155#issuecomment-581862425

// Mock data and helper methods

window.AudioContext = mockaudioContext;
import "./test/__mocks__/HTMLMediaElement"

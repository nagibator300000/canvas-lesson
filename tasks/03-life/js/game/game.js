import styles from './game.module.css';
import Engine from '../engine';

export default class Game {
  /** @type {HTMLButtonElement} */
  playBtn = null;

  /** @type {HTMLButtonElement} */
  pauseBtn = null;

  /** @type {HTMLButtonElement} */
  clearBtn = null;

  /** @type {HTMLInputElement} */
  cycleLengthInput = null;

  /** @type {HTMLInputElement} */
  cellNumInput = null;

  /** @type {HTMLDivElement} */
  element = null;

  /** @type {Engine} */
  engine = null;

  /** @type {HTMLButtonElement} */
  saveBtn = null;

  /** @type {HTMLButtonElement} */
  loadBtn = null;

  onPlay = () => {
    this.playBtn.disabled = true;
    this.pauseBtn.disabled = false;
    this.engine.play();
  };

  onPause = () => {
    this.playBtn.disabled = false;
    this.pauseBtn.disabled = true;
    this.engine.pause();
  };

  onClear = () => {
    this.engine.clear();
  };

  onSave = () => {
    this.engine.save();
  };

  onLoad = () => {
    this.filePicker.click();
  };

  onCycleLenthChange = () => {
    const value = Number(this.cycleLengthInput.value);
    this.engine.cycleLength = value;
  };

  onCellNumChange = () => {
    const value = Number(this.cellNumInput.value);
    this.engine.setCellNum(value);
  };

  constructor(root = document.body) {
    this.root = root;
    this.filePicker = document.createElement('input');
    this.filePicker.type = 'file';
    this.filePicker.addEventListener('change', () => {
      const reader = new FileReader();
      reader.readAsText(this.filePicker.files[0]);
      const event = reader.addEventListener('loadend', () => {
        this.engine.load(reader.result);
        reader.removeEventListener('loadend', event);
      });
    });

    this.render();
    this.root.append(this.element);
    this.initListeners();
    this.initEngine();
  }

  initEngine() {
    this.engine = new Engine(this.canvas);
  }

  static get template() {
    return `
      <div class=${styles.game}>
        <div class=${styles.controls}>
          <button>Play</button>
          <button disabled>Pause</button>
          <button>Clear</button>
          <label class=${styles.label}>
            Время цикла
            <input type="number" value=500 class=${styles.input}>
            ms
          </label>
          <label class=${styles.label}>
            Разрешение
            <input type="number" value=10 class=${styles.input}>
          </label>
          <button>Save</button>
          <button>Load</button>  
        </div>
        <div class=${styles.canvasContainer}>
          <canvas class=${styles.canvas} width=500 height=500>
            Canvas is not supported in your browser
          </canvas>
        </div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = Game.template;
    this.element = wrapper.firstElementChild;
    [this.playBtn, this.pauseBtn, this.clearBtn, this.saveBtn, this.loadBtn] =
      this.element.querySelectorAll('button');
    [this.cycleLengthInput, this.cellNumInput] =
      this.element.querySelectorAll('input');
    this.canvas = this.element.querySelector('canvas');
  }

  initListeners() {
    this.playBtn.addEventListener('click', this.onPlay);
    this.pauseBtn.addEventListener('click', this.onPause);
    this.clearBtn.addEventListener('click', this.onClear);
    this.cycleLengthInput.addEventListener('change', this.onCycleLenthChange);
    this.cellNumInput.addEventListener('change', this.onCellNumChange);
    this.saveBtn.addEventListener('click', this.onSave);
    this.loadBtn.addEventListener('click', this.onLoad);
  }
}

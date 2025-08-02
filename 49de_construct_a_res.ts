interface TrackerData {
  id: string;
  timestamp: number;
  data: string;
}

class Tracker {
  private storage: TrackerData[] = [];

  addData(data: string): void {
    const newData: TrackerData = {
      id: `tracker-${this.storage.length + 1}`,
      timestamp: Date.now(),
      data,
    };
    this.storage.push(newData);
    this.updateStorage();
  }

  getData(): TrackerData[] {
    return this.storage;
  }

  private updateStorage(): void {
    // Implement storage update logic here (e.g., save to local storage or send to server)
  }
}

class App {
  private tracker: Tracker;
  private domElements: {
    input: HTMLInputElement;
    submit: HTMLButtonElement;
    dataList: HTMLUListElement;
  };

  constructor() {
    this.tracker = new Tracker();
    this.domElements = this.getDOMElements();
    this.setEventListeners();
  }

  private getDOMElements(): {
    input: HTMLInputElement;
    submit: HTMLButtonElement;
    dataList: HTMLUListElement;
  } {
    return {
      input: document.getElementById('input-field') as HTMLInputElement,
      submit: document.getElementById('submit-btn') as HTMLButtonElement,
      dataList: document.getElementById('data-list') as HTMLUListElement,
    };
  }

  private setEventListeners(): void {
    this.domElements.submit.addEventListener('click', (e: MouseEvent) => {
      e.preventDefault();
      const data = this.domElements.input.value.trim();
      if (data) {
        this.tracker.addData(data);
        this.domElements.input.value = '';
        this.updateDataList();
      }
    });
  }

  private updateDataList(): void {
    const dataList = this.tracker.getData();
    this.domElements.dataList.innerHTML = '';
    dataList.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.timestamp} - ${item.data}`;
      this.domElements.dataList.appendChild(listItem);
    });
  }
}

const app = new App();
export class FormValidation {
  constructor(textArea, date, time) {
    this.textArea = textArea;
    this.date = date;
    this.time = time;

    this.cacheDomElementsLabel();
    this.setUpEventListener();
  }

  setUpEventListener() {
    this.date.addEventListener("change", (e) => this.handleDateOnChange(e));
    this.time.addEventListener("change", (e) => this.handleTimeOnChange(e));
    this.textArea.addEventListener("input", (e) =>
      this.handleTextAreaOnChange(e)
    );
  }

  cacheDomElementsLabel() {
    this.labelElement = {
      textLabel: document.getElementById("text-label"),
      dateLabel: document.getElementById("date-label"),
      timeLabel: document.getElementById("time-label"),
    };
  }

  handleDateOnChange(e) {
    const today = new Date();
    const selectedDate = new Date(e.target.value); // Get the selected date from the input

    // Set time to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (isNaN(selectedDate.getTime()) || selectedDate < today) {
      this.setUpRedErrorColor("dateLabel");
      console.error("You have to pick today or a future day");
    } else {
      this.removeRedErrorColor("dateLabel");
    }
  }

  handleTimeOnChange(e) {
    // Add your time validation logic here
    const selectedTime = e.target.value;
    if (!selectedTime) {
      this.setUpRedErrorColor("timeLabel");
      console.error("You have to pick a time");
    } else {
      this.removeRedErrorColor("timeLabel");
    }
  }

  handleTextAreaOnChange(e) {
    // Add your text area validation logic here
    const textValue = e.target.value;
    if (!textValue) {
      this.setUpRedErrorColor("textLabel");
      console.error("You have to enter some text");
    } else {
      this.removeRedErrorColor("textLabel");
    }
  }

  setUpRedErrorColor(labelName) {
    this.labelElement[labelName].classList.remove(
      "text-gray-700",
      "border-gray-400"
    );
    this.labelElement[labelName].classList.add(
      "text-red-500",
      "border-red-400"
    );
  }

  removeRedErrorColor(labelName) {
    this.labelElement[labelName].classList.remove(
      "text-red-500",
      "border-red-400"
    );
    this.labelElement[labelName].classList.add(
      "text-gray-700",
      "border-gray-400"
    );
  }
}

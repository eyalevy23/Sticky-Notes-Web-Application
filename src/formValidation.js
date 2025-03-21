export class FormValidation {
  constructor(textArea, date, time) {
    this.textArea = textArea;
    this.date = date;
    this.time = time;
    this.validFields = {
      textLabel: false,
      dateLabel: true,
      timeLabel: false,
    };

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

  handleDateOnChange(event) {
    const selectedDate = new Date(event.target.value);
    const today = new Date();

    // Remove the time part for comparison
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    const isValidDate = selectedDate >= today;
    this.setErrorColor("dateLabel", !isValidDate);

    if (!isValidDate) {
      console.error("You have to pick today or a future day");
    }

    // Collapse date picker menu
    this.date.blur();

    // Revalidate the time field in case the selected date changes its context.
    this.validateTimeField();
  }

  // Revalidates the time field based on the current date selection.
  validateTimeField() {
    const selectedTime = this.time.value;

    // If no time has been picked, indicate error.
    if (!selectedTime) {
      this.setErrorColor("timeLabel", true);
      return;
    }

    // If the selected date is today, then validate that the time has not already passed.
    if (this.isDateToday() && this.hasTimePassed(selectedTime)) {
      this.setErrorColor("timeLabel", true);
      console.error("The selected time has already passed.");
    } else {
      // For future dates (or a valid time for today), clear any error.
      this.setErrorColor("timeLabel", false);
    }
  }

  // Checks whether the selected date is today.
  isDateToday() {
    const today = new Date();
    const selectedDate = new Date(this.date.value);

    return (
      today.getFullYear() === selectedDate.getFullYear() &&
      today.getMonth() === selectedDate.getMonth() &&
      today.getDate() === selectedDate.getDate()
    );
  }

  // Given a time string in "HH:MM", returns true if this time has already passed today.
  hasTimePassed(selectedTime) {
    const now = new Date();
    const [hour, minute] = selectedTime.split(":").map(Number);

    return (
      hour < now.getHours() ||
      (hour === now.getHours() && minute <= now.getMinutes())
    );
  }

  handleTimeOnChange(event) {
    // When time changes, perform revalidation.
    this.validateTimeField();
  }

  handleTextAreaOnChange(event) {
    const textValue = event.target.value;
    if (!textValue) {
      this.setErrorColor("textLabel", true);
      console.error("You have to enter some text");
    } else {
      this.setErrorColor("textLabel", false);
    }
  }

  setErrorColor(labelName, isError) {
    const label = this.labelElement[labelName];
    if (label) {
      label.classList.toggle("text-gray-700", !isError);
      label.classList.toggle("border-gray-400", !isError);
      label.classList.toggle("text-red-500", isError);
      label.classList.toggle("border-red-400", isError);
      this.validFields[labelName] = !isError;
    }
  }

  setBounceAnimation(labelName) {
    const label = this.labelElement[labelName];
    if (label) {
      label.classList.add("bounce-effect");
      setTimeout(() => {
        label.classList.remove("bounce-effect");
      }, 1000);
    }
  }

  isValidForm() {
    const isValid =
      this.validFields.dateLabel &&
      this.validFields.timeLabel &&
      this.validFields.textLabel;

    if (!isValid) {
      Object.entries(this.validFields).forEach(([key, value]) => {
        if (!value) {
          this.setBounceAnimation(key);
          this.setErrorColor(key, true);
        }
      });
    }
    return isValid;
  }

  resetFormFields() {
    this.setErrorColor("textLabel", false);
    this.setErrorColor("dateLabel", false);
    this.setErrorColor("timeLabel", false);
    this.validFields = {
      textLabel: false,
      dateLabel: true,
      timeLabel: false,
    };
  }

  isNoteDuePassed(note) {
    // Ignore default placeholder dates
    if (note.dueDate === "dd/mm/yyyy") {
      return false;
    }

    // Parse the due date and time into a Date object.
    const noteDueDate = this.parseDueDate(note.dueDate, note.dueTime);

    const now = new Date();

    // Return true if the note due date/time is in the past.
    return noteDueDate < now;
  }

  parseDueDate(dateStr, timeStr = "00:00") {
    const [day, month, year] = dateStr.split("/").map(Number);
    const [hour, minute] = timeStr.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
  }
}

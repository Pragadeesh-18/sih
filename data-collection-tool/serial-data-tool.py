import sys
from PyQt5.QtWidgets import (
    QApplication, QLabel, QPushButton, QGridLayout, QWidget,
    QFileDialog, QComboBox, QLineEdit
)
from PyQt5 import QtCore
from PyQt5.QtGui import QCursor, QPixmap

class DataCollectionTool(QWidget):
    folder_path_changed = QtCore.pyqtSignal(str)

    def __init__(self):
        super().__init__()
        self.folder_path = ''
        self.count = 100
        self.setup_ui()

    def setup_ui(self):
        self.grid = QGridLayout()
        self.setLayout(self.grid)


        self.setStyleSheet(open("styles.css").read())


        # Create and arrange widgets
        self.serial_port_label = QLabel("Serial Port")
        self.serial_port = QComboBox()
        self.serial_port.addItems(['COM 1', 'COM 2', 'COM 3'])
        self.serial_port.setMaximumWidth(250)

        self.file_label = QLabel("File Name")
        self.file = QLineEdit()
        self.file.setMaximumWidth(250)

        self.baud_rate_label = QLabel("Baud Rate")
        self.baud_rate = QComboBox()
        self.baud_rate.addItems([
            '4800', '9600', '19200', '38400', '57600',
            '115200', '230400', '460800', '921600'
        ])
        self.baud_rate.setMaximumWidth(250)

        self.path_label = QLabel("File Path")
        self.path = QLineEdit()
        self.path.setReadOnly(True)
        self.path.setMaximumWidth(250)

        self.button = QPushButton("Select Location")
        self.button.setCursor(QCursor(QtCore.Qt.PointingHandCursor))
        self.button.clicked.connect(self.get_file)

        # Image and file count display using QLabel with an image and HTML
        self.image_label = QLabel()
        html = f"""
        <div>
            <img src="images/document.png" width="32" height="32" />
            <p>File Count: {self.count}</p>
        </div>"""

        self.image_label.setText(html)
        self.image_label.setAlignment(QtCore.Qt.AlignCenter)
        self.image_label.setStyleSheet("""border: 1px solid #ddd;
                                         margin-top:15px;
                                         margin-bottom:15px;
                                         padding: 15px;
                                         font-size: 24px
                                      """)

        # Add widgets to the grid layout
        self.grid.addWidget(self.serial_port_label)
        self.grid.addWidget(self.serial_port)

        self.grid.addWidget(self.file_label)
        self.grid.addWidget(self.file)

        self.grid.addWidget(self.baud_rate_label)
        self.grid.addWidget(self.baud_rate)

        self.grid.addWidget(self.path_label)
        self.grid.addWidget(self.path)

        self.grid.addWidget(self.button)

        self.grid.addWidget(self.image_label)

        # Signal to update file path
        self.folder_path_changed.connect(self.update_path_display)

    def get_file(self):
        folder_dialog = QFileDialog()
        folder_dialog.setWindowTitle('Select Folders')
        folder_dialog.setFileMode(QFileDialog.Directory)

        if folder_dialog.exec_() == QFileDialog.Accepted:
            selected_folders = folder_dialog.selectedFiles()
            if selected_folders:
                self.folder_path = selected_folders[0]
                self.folder_path_changed.emit(self.folder_path)

    def update_path_display(self, path):
        self.path.setText(path + '/')

def main():
    app = QApplication(sys.argv)
    window = DataCollectionTool()
    window.setWindowTitle("Data Collector")
    window.setFixedWidth(500)
    window.show()
    sys.exit(app.exec_())

if __name__ == "__main__":
    main()

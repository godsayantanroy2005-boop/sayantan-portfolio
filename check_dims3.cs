using System;
using System.Drawing;

public class Program {
    public static void Main() {
        string inputPath = @"c:\Users\Asus\Downloads\sayanatn protfolio\public\images\characters\sprite-sheet.jpg";
        using (Bitmap img = new Bitmap(inputPath)) {
            Console.WriteLine("Width: " + img.Width + ", Height: " + img.Height);
        }
    }
}

using System;
using System.Drawing;
using System.Drawing.Imaging;

public class Program {
    public static void Main() {
        string inputPath = @"C:\Users\Asus\.gemini\antigravity\brain\8c660319-4174-40a6-b1ba-51c815057d9b\.user_uploaded\media_1788375965956.jpg";
        using (Bitmap img = new Bitmap(inputPath)) {
            Console.WriteLine("Width: " + img.Width + ", Height: " + img.Height);
        }
    }
}

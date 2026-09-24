using System;
using System.Drawing;
using System.Drawing.Imaging;

class Program {
    static void Main() {
        string inputPath = @"C:\Users\Asus\.gemini\antigravity\brain\8c660319-4174-40a6-b1ba-51c815057d9b\.user_uploaded\media_1788375965956.jpg";
        using (Bitmap img = new Bitmap(inputPath)) {
            // Let's first just print the dimensions so we know where to crop
            Console.WriteLine($"Width: {img.Width}, Height: {img.Height}");
        }
    }
}

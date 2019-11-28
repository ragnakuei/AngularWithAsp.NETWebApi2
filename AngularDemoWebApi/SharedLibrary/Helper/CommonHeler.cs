using System;

namespace SharedLibrary.Helper
{
    public static class CommonHeler
    {
        public static int ToInt32(this object o)
        {
            Int32.TryParse(o.ToString(), out int result);
            return result;
        }
    }
}
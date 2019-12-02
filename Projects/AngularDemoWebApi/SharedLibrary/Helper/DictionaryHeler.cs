using System.Collections.Generic;

namespace SharedLibrary.Helper
{
    public static class DictionaryHeler
    {
        public static TValue GetValue<TKey, TValue>(this Dictionary<TKey, TValue> dict
                                                  , TKey key
                                                  , TValue value = default)
        {
            if (dict.ContainsKey(key))
            {
                dict.TryGetValue(key, out value);
                return value;
            }

            return value;
        }
    }
}